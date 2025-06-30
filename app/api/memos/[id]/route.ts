import { NextRequest, NextResponse } from 'next/server';
import db from '#/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memo = db.memo.find({ where: { id: params.id } });
    
    if (!memo) {
      return NextResponse.json(
        { error: '메모를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(memo);
  } catch (error) {
    return NextResponse.json(
      { error: '메모 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, content, category, tags, isPinned } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: '제목, 내용, 카테고리는 필수입니다.' },
        { status: 400 }
      );
    }

    const updatedMemo = db.memo.update(params.id, {
      title,
      content,
      category,
      tags: tags || [],
      isPinned: isPinned || false,
    });

    if (!updatedMemo) {
      return NextResponse.json(
        { error: '메모를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMemo);
  } catch (error) {
    return NextResponse.json(
      { error: '메모 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = db.memo.delete(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: '메모를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '메모가 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json(
      { error: '메모 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
} 