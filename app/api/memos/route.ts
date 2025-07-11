import { type NextRequest, NextResponse } from "next/server";
import db from "#/lib/db";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get("category");
	const tags = searchParams.get("tags")?.split(",");
	const search = searchParams.get("search");
	const isPinned = searchParams.get("isPinned");
	const isArchived = searchParams.get("isArchived");
	const debug = searchParams.get("debug");

	// 디버깅 모드: 모든 메모 반환
	if (debug === "true") {
		const allMemos = db.memo.findMany();
		console.log("Debug: All memos in database:", allMemos);
		return NextResponse.json(allMemos);
	}

	const memos = db.memo.findMany({
		where: {
			category: category || undefined,
			tags: tags || undefined,
			search: search || undefined,
			isPinned: isPinned ? isPinned === "true" : undefined,
			isArchived: isArchived ? isArchived === "true" : undefined,
		},
		orderBy: { field: "updatedAt", direction: "desc" },
	});

	return NextResponse.json(memos);
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { title, content, category, tags, isPinned } = body;

		if (!title || !content || !category) {
			return NextResponse.json(
				{ error: "제목, 내용, 카테고리는 필수입니다." },
				{ status: 400 },
			);
		}

		const newMemo = db.memo.create({
			title,
			content,
			category,
			tags: tags || [],
			isPinned: isPinned || false,
			isArchived: false,
		});

		console.log("Created memo:", newMemo); // 디버깅용 로그

		// 생성 후 즉시 조회해서 확인
		const verifyMemo = db.memo.find({ where: { id: newMemo.id } });
		console.log("Verification - Found memo after creation:", verifyMemo);

		return NextResponse.json(newMemo, { status: 201 });
	} catch (error) {
		console.error("Error creating memo:", error);
		return NextResponse.json(
			{ error: "메모 생성에 실패했습니다." },
			{ status: 500 },
		);
	}
}
