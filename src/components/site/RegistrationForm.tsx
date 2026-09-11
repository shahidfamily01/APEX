import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { plans, waLink, trainers, ladiesTrainers } from "@/lib/gym";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Phone can only contain digits and + - ( )"),
  id_type: z.enum(["cnic", "bform"]),
  id_number: z
    .string()
    .trim()
    .max(20)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || /^[0-9-]{10,20}$/.test(v), "Please enter a valid CNIC / B-Form number"),
  address: z.string().trim().min(5, "Please enter your home address").max(200),
  gender: z.enum(["male", "female"]),
  plan: z.string().trim().max(60).optional(),
});

export function RegistrationForm({
  kind = "membership",
  gender,
  showPlan = true,
  disabled = false,
}: {
  kind?: "membership" | "event";
  gender?: "male" | "female";
  showPlan?: boolean;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: fd.get("full_name"),
      phone: fd.get("phone"),
      id_type: fd.get("id_type"),
      id_number: fd.get("id_number"),
      address: fd.get("address"),
      gender: gender ?? fd.get("gender"),
      plan: showPlan ? ((fd.get("plan") as string) || undefined) : undefined,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }

    setErrors({});
    
    // Construct WhatsApp message
    const d = parsed.data;
    const msg = [
      `*New ${kind === "event" ? "Event Registration" : "Membership Registration"}*`,
      `Name: ${d.full_name}`,
      `Phone: ${d.phone}`,
      `Gender: ${d.gender}`,
      d.id_number ? `ID (${d.id_type}): ${d.id_number}` : null,
      `Address: ${d.address}`,
      d.plan ? `Plan: ${d.plan}` : null,
    ].filter(Boolean).join("\n");

    // Route to the correct trainer based on gender
    const targetPhone = d.gender === "female" ? ladiesTrainers[0].whatsapp : trainers[0].whatsapp;
    
    window.dispatchEvent(new CustomEvent("apex-registration"));
    window.location.href = waLink(targetPhone, msg);
    setDone(true);
  }

  if (done) {
    return (
      <div className="surface-card rounded-sm p-8 text-center">
        <h3 className="text-2xl">You're on the list</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Thanks! Your details are with the Apex Fit Club team. We'll call or WhatsApp you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card space-y-5 rounded-sm p-6 sm:p-8" noValidate>
      <fieldset disabled={disabled} className="space-y-5">
        <Field label="Full Name" error={errors["full_name"]}>
          <Input name="full_name" maxLength={100} placeholder="e.g. Ahmed Raza" required />
        </Field>

        <Field label="Phone Number" error={errors["phone"]}>
          <Input name="phone" type="tel" maxLength={20} placeholder="0300-1234567" required />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="ID Type" error={errors["id_type"]}>
            <select
              name="id_type"
              defaultValue="cnic"
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm"
            >
              <option value="cnic">CNIC</option>
              <option value="bform">B-Form (no CNIC)</option>
            </select>
          </Field>
          <Field label="CNIC / B-Form Number (optional)" error={errors["id_number"]}>
            <Input name="id_number" maxLength={20} placeholder="61101-1234567-1" />
          </Field>
        </div>

        <Field label="Home Address" error={errors["address"]}>
          <Input name="address" maxLength={200} placeholder="House / Street, Area, City" required />
        </Field>

        {gender ? null : (
          <Field label="Gender" error={errors["gender"]}>
            <select
              name="gender"
              defaultValue="male"
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
        )}

        {showPlan ? (
          <Field label="Membership Plan" error={errors["plan"]}>
            <select
              name="plan"
              defaultValue={plans[3]!.name}
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm"
            >
              {plans.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} — Rs. {p.price.toLocaleString()}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending…" : kind === "event" ? "Register for Event" : "Submit Registration"}
        </Button>
      </fieldset>
      <p className="text-xs text-muted-foreground">
        Your details are stored privately and are visible only to the gym owner.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
