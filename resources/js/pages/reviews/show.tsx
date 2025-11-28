import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Reviews', href: '/reviews' },
    { title: 'Review Details', href: '#' },
];

interface Reviewer {
    id: number;
    name: string;
}

interface Reviewable {
    id: number;
    name: string;
}

interface Props {
    review: {
        id: number;
        content: string;
        rating: number | null;
        created_at: string;
        reviewable_type: string;
        reviewable: Reviewable;
        reviewer?: Reviewer;
    };
    canEdit: boolean;
}

export default function ReviewsShow({ review, canEdit }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(`/reviews/${review.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Review: ${review.reviewable.name}`} />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Review Details</h1>
                        <p className="text-gray-600 mt-1">View and manage review information</p>
                    </div>
                    <div className="flex gap-2">
                        {canEdit && (
                            <Link href={`/reviews/${review.id}/edit`}>
                                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Edit</Button>
                            </Link>
                        )}
                        {canEdit && (
                            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                        )}
                        <Link href="/reviews">
                            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Back to Reviews</Button>
                        </Link>
                    </div>
                </div>

                <Card className="bg-white border-gray-200">
                    <CardHeader className="border-b border-gray-200">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <CardTitle className="flex items-center gap-2 text-xl text-gray-900 mb-2">
                                    Review of {review.reviewable_type}: {review.reviewable.name}
                                    <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                                        {review.reviewable_type}
                                    </Badge>
                                </CardTitle>
                                {review.reviewer && (
                                    <CardDescription className="text-gray-600">
                                        By: <span className="font-medium">{review.reviewer.name}</span>
                                    </CardDescription>
                                )}
                            </div>
                            {review.rating && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                    {review.rating}/5 ⭐
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Review Content</p>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{review.content}</p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Created At</p>
                                <span className="text-sm text-gray-600">
                                    {new Date(review.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

