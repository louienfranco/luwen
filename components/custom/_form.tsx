"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";

export default function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Build mailto without '+' for spaces
  const mailtoHref = useMemo(() => {
    const subjectLine =
      subject.trim() || `New message from ${name || "Portfolio"}`;

    // Use CRLF for better client compatibility
    const body = `Name: ${name || "-"}\r\nEmail: ${fromEmail || "-"}\r\n\r\n${
      message || ""
    }`;

    // encodeURIComponent => spaces as %20 (not +)
    const q = `subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(body)}`;
    return `mailto:${email}?${q}`;
  }, [email, name, fromEmail, subject, message]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = mailtoHref;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            className="!bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="!bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="What’s this about?"
          className="!bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me a bit about your project or question…"
          rows={6}
          className="!bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <Button type="submit" className="gap-2">
          <Send className="h-4 w-4" />
          Send message
        </Button>

        <Button asChild variant="outline">
          <a href={mailtoHref}>
            <Mail className="mr-2 h-4 w-4" />
            Email me directly
          </a>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        This opens your email client with the message prefilled.
      </p>
    </form>
  );
}
