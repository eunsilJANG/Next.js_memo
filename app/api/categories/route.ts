import { NextResponse } from 'next/server';
import db from '#/lib/db';

export async function GET() {
  try {
    const categories = db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: '카테고리 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
} 