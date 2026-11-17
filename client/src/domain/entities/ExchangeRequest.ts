export interface ExchangeRequest {
    id: string;
    bookId: string;
    requesterId: string;
    createdAt: string;
    book?: { id: string; name: string; author: string };
    requester?: { id: string; name: string; email: string };
}