import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  reviewer_name: z.string().trim().min(2, "Please enter your name").max(80),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().trim().min(5, "Please write a bit more").max(800),
});

type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

// Hardcoded initial reviews to make the section look populated
const defaultReviews: Review[] = [
  {
    id: "1",
    reviewer_name: "Ali Khan",
    rating: 5,
    review_text:
      "Best gym in Rawalpindi! The trainers are very professional and the equipment is top-notch. The environment is highly motivating.",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    reviewer_name: "Usman Tariq",
    rating: 5,
    review_text:
      "Najam bhai is an excellent coach. I saw a huge difference in my strength and stamina within a month of following his workout routines.",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    reviewer_name: "Hassan Raza",
    rating: 5,
    review_text:
      "Very clean environment and the machines are very smooth. The separate timing and dedicated trainer for ladies is a great feature too.",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const STORAGE_KEY = "apex-local-reviews";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setReviews(parsed);
          }
        } catch (e) {}
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReviews));
      }
    }
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      reviewer_name: fd.get("reviewer_name"),
      rating,
      review_text: fd.get("review_text"),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }

    setErrors({});

    const newReview: Review = {
      id: Date.now().toString(),
      reviewer_name: parsed.data.reviewer_name,
      rating: parsed.data.rating,
      review_text: parsed.data.review_text,
      created_at: new Date().toISOString(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
    }

    // reset form
    (e.target as HTMLFormElement).reset();
    setRating(5);
    toast.success("Review posted successfully!");
  }

  function formatTime(isoString: string) {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
        {reviews.map((r) => (
          <article key={r.id} className="surface-card rounded-sm p-6 relative overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-bold text-primary uppercase">
                  {r.reviewer_name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-tight">{r.reviewer_name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <Stars value={r.rating} />
                    <span className="text-xs text-muted-foreground">{formatTime(r.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.review_text}</p>
          </article>
        ))}
      </div>

      <div className="self-start sticky top-24">
        <form onSubmit={onSubmit} className="surface-card space-y-5 rounded-sm p-6 sm:p-8" noValidate>
          <h3 className="text-xl">Write a review</h3>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Your Name</Label>
            <Input name="reviewer_name" maxLength={80} placeholder="e.g. Ahmed Raza" />
            {errors["reviewer_name"] ? (
              <p className="text-xs text-destructive">{errors["reviewer_name"]}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  onClick={() => setRating(n)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Your Review
            </Label>
            <Textarea name="review_text" maxLength={800} rows={5} placeholder="How was your experience at Apex Fit Club?" />
            {errors["review_text"] ? (
              <p className="text-xs text-destructive">{errors["review_text"]}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full">
            Post Review
          </Button>
        </form>
      </div>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= value ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      ))}
    </span>
  );
}
