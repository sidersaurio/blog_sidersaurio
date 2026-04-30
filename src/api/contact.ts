import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { supabase } from '../../utils/supabase';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
	if (request.method !== 'POST') {
		return new Response('Method not allowed', { status: 405 });
	}

	try {
		const data = await request.json();
		const { name, email, message } = data;

		// Validate input
		if (!name || !email || !message) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(JSON.stringify({ error: 'Invalid email format' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Save to Supabase
		const { data: contactData, error: dbError } = await supabase
			.from('contact_messages')
			.insert([{ name, email, message }])
			.select();

		if (dbError) {
			console.error('Database error:', dbError);
			return new Response(JSON.stringify({ error: 'Failed to save message' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Send email via Resend
		const emailResult = await resend.emails.send({
			from: import.meta.env.PUBLIC_RESEND_FROM_EMAIL || 'noreply@example.com',
			to: import.meta.env.CONTACT_EMAIL || 'contact@example.com',
			subject: `New Contact Form Submission from ${name}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, '<br>')}</p>
			`,
		});

		// Send confirmation email to user
		await resend.emails.send({
			from: import.meta.env.PUBLIC_RESEND_FROM_EMAIL || 'noreply@example.com',
			to: email,
			subject: 'We received your message',
			html: `
				<h2>Thank you for contacting us!</h2>
				<p>Hi ${name},</p>
				<p>We have received your message and will get back to you as soon as possible.</p>
				<p>Best regards,<br>El Blog del Sidersaurio Team</p>
			`,
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Your message has been sent successfully!',
				data: contactData,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('API error:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
