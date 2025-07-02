// This is a mock database used to simplify parts of the app not
// relevant to the demo. In a real app, this data would live in
// a relational database like PostgreSQL or MySQL, accessed through
// a database client or ORM.

export type Memo = {
	id: string;
	title: string;
	content: string;
	category: string;
	tags: string[];
	createdAt: string;
	updatedAt: string;
	isPinned: boolean;
	isArchived: boolean;
};

export type Category = {
	id: string;
	name: string;
	slug: string;
	color: string;
	icon: string;
};

export type Tag = {
	id: string;
	name: string;
	color: string;
};

const categories: Category[] = [
	{ id: "1", name: "Personal", slug: "personal", color: "#3B82F6", icon: "👤" },
	{ id: "2", name: "Work", slug: "work", color: "#10B981", icon: "💼" },
	{ id: "3", name: "Ideas", slug: "ideas", color: "#F59E0B", icon: "💡" },
	{ id: "4", name: "Study", slug: "study", color: "#8B5CF6", icon: "📚" },
	{ id: "5", name: "Shopping", slug: "shopping", color: "#EF4444", icon: "🛒" },
	{ id: "6", name: "Travel", slug: "travel", color: "#06B6D4", icon: "✈️" },
];

const tags: Tag[] = [
	{ id: "1", name: "Important", color: "#EF4444" },
	{ id: "2", name: "Urgent", color: "#F59E0B" },
	{ id: "3", name: "Project", color: "#10B981" },
	{ id: "4", name: "Meeting", color: "#3B82F6" },
	{ id: "5", name: "Todo", color: "#8B5CF6" },
	{ id: "6", name: "Reference", color: "#6B7280" },
];

// 샘플 메모 제거 - 빈 배열로 시작
const memos: Memo[] = [];

export const data = { categories, tags, memos };
