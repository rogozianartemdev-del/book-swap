export interface Book {
    id: string;
    ownerId: string;
    name: string;
    author: string;
    description: string | null;
    photoUrl: string | null;
    filePath: string | null;
    createdAt: string;
    owner?: { id: string; name: string };
}

export type BookSortBy = 'name' | 'author';
export type SortOrder = 'asc' | 'desc';