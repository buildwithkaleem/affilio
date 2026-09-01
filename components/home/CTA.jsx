import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border bg-muted/40 px-6 py-16 text-center sm:px-12">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to start earning?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Create your Affilio account and start building your affiliate
          business today.
        </p>

        <Link href="/register" className="mt-8 inline-block">
          <Button size="lg">
            Create Free Account
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
      </div>
    </section>
  );
}