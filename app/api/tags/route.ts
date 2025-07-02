import { NextResponse } from "next/server";
import db from "#/lib/db";

export async function GET() {
	try {
		const tags = db.tag.findMany();
		return NextResponse.json(tags);
	} catch (_error) {
		return NextResponse.json(
			{ error: "태그 조회에 실패했습니다." },
			{ status: 500 },
		);
	}
}
