
// Removed "use client";

import AppLayout from '@/components/layout/app-layout';
import { mockInitiatives } from '@/data/mock-initiatives';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react'; // Import React.use

interface InitiativeDetailPageProps {
  params: Promise<{ slug: string }>; // Updated to reflect params as a Promise, as per the warning
}

function InitiativeDetailContent({ slug }: { slug: string }) {
  const initiative = mockInitiatives.find((init) => init.slug === slug);

  if (!initiative) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-muted-foreground">Initiative not found.</h2>
        <Button asChild variant="link" className="mt-4">
          <Link href="/initiatives">Back to Initiatives</Link>
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden">
      {initiative.imageUrl && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={initiative.imageUrl}
            alt={initiative.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={initiative.aiHint || "project detail"}
          />
        </div>
      )}
      <CardHeader className="p-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={initiative.status === 'Completed' ? 'default' : initiative.status === 'Ongoing' ? 'secondary' : 'outline'} className="rounded-full text-sm py-1 px-3">
            {initiative.status}
          </Badge>
           <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href="/initiatives">
              Back to Initiatives
            </Link>
          </Button>
        </div>
        <CardTitle className="text-3xl md:text-4xl font-bold leading-tight font-quicksand text-primary">
          {initiative.title}
        </CardTitle>
        <CardDescription className="text-lg md:text-xl leading-relaxed text-foreground/80 pt-2">
          {initiative.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 prose max-w-none dark:prose-invert prose-p:text-base md:prose-p:text-lg prose-headings:font-quicksand">
        {initiative.content && (
          <>
            <div dangerouslySetInnerHTML={{ __html: initiative.content }} />
            <hr className="my-8" />
          </>
        )}
        
        <div>
          <h3 className="text-2xl font-semibold font-quicksand mb-4 flex items-center text-primary">
            <ListChecks size={28} className="mr-3" />
            Goals
          </h3>
          <ul className="space-y-3 list-none p-0">
            {initiative.goals.map((goal, index) => (
              <li key={index} className="flex items-start text-base md:text-lg">
                <CheckCircle size={20} className="mr-3 mt-1 text-accent flex-shrink-0" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default function InitiativeDetailPage({ params: paramsPromise }: InitiativeDetailPageProps) {
  // As per the warning, `params` is a Promise. We unwrap it using `use`.
  const resolvedParams = use(paramsPromise);

  return (
    <AppLayout>
      <InitiativeDetailContent slug={resolvedParams.slug} />
    </AppLayout>
  );
}
