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
];

interface Review {
    id: number;
    content: string;
    rating: number | null;
    created_at: string;
    reviewable_type: string;
    reviewable: { id: number; name: string };
    reviewer?: { id: number; name: string };
    can_edit: boolean;
}

interface Props {
    reviews: Review[];
}

export default function ReviewsIndex({ reviews }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(`/reviews/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reviews" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
                        <p className="text-gray-600 mt-1">View and manage reviews</p>
                    </div>
                    <Link href="/reviews/create">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Create Review</Button>
                    </Link>
                </div>

                {reviews.length === 0 ? (
                    <Card className="text-center py-12 bg-white border-gray-200">
                        <CardContent>
                            <p className="text-gray-500 mb-4">No reviews found.</p>
                            <Link href="/reviews/create">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create First Review</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <Card key={review.id} className="bg-white border-gray-200">
                                <CardHeader className="border-b border-gray-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="flex items-center gap-2 text-gray-900 mb-2">
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
                                    <p className="text-gray-700 leading-relaxed">{review.content}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">
                                            {new Date(review.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link href={`/reviews/${review.id}`}>
                                                <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                                                    View
                                                </Button>
                                            </Link>
                                            {review.can_edit && (
                                                <Link href={`/reviews/${review.id}/edit`}>
                                                    <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            )}
                                            {review.can_edit && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(review.id)}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

