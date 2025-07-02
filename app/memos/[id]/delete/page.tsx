"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Boundary } from "#/ui/boundary";
import Button from "#/ui/button";

export default function DeleteMemoPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const [memo, setMemo] = useState<any>(null);
	const [_isLoading, _setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		fetch(`/api/memos/${params.id}`)
			.then((res) => res.json())
			.then((data) => setMemo(data))
			.catch(() => router.push("/"));
	}, [params.id, router]);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const response = await fetch(`/api/memos/${params.id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				router.push("/");
			} else {
				throw new Error("삭제에 실패했습니다.");
			}
		} catch (error) {
			console.error("Error deleting memo:", error);
			alert("메모 삭제에 실패했습니다.");
		} finally {
			setIsDeleting(false);
		}
	};

	if (!memo) {
		return (
			<Boundary
				label="메모 삭제"
				animateRerendering={false}
				kind="solid"
				className="flex flex-col gap-6"
			>
				<div className="text-center">
					<div className="text-gray-400">로딩 중...</div>
				</div>
			</Boundary>
		);
	}

	return (
		<Boundary
			label="메모 삭제"
			animateRerendering={false}
			kind="solid"
			className="flex flex-col gap-6"
		>
			{/* 헤더 */}
			<div>
				<Link
					href={`/memos/${params.id}`}
					className="text-gray-400 hover:text-gray-300 transition-colors"
				>
					← 메모로 돌아가기
				</Link>
				<h1 className="text-2xl font-bold text-gray-100 mt-2">메모 삭제</h1>
			</div>

			{/* 삭제 확인 */}
			<div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
				<div className="flex items-center gap-3 mb-4">
					<span className="text-2xl">⚠️</span>
					<h2 className="text-xl font-semibold text-red-300">
						정말로 이 메모를 삭제하시겠습니까?
					</h2>
				</div>

				<div className="bg-gray-900 rounded-lg p-4 mb-4">
					<h3 className="font-medium text-gray-200 mb-2">{memo.title}</h3>
					<p className="text-sm text-gray-400 line-clamp-3">
						{memo.content.replace(/\n/g, " ")}
					</p>
				</div>

				<p className="text-red-300 text-sm">
					이 작업은 되돌릴 수 없습니다. 메모와 관련된 모든 데이터가 영구적으로
					삭제됩니다.
				</p>
			</div>

			{/* 버튼 */}
			<div className="flex items-center gap-3">
				<Button onClick={handleDelete} disabled={isDeleting} kind="error">
					{isDeleting ? "삭제 중..." : "삭제 확인"}
				</Button>
				<Link href={`/memos/${params.id}`}>
					<Button>취소</Button>
				</Link>
			</div>
		</Boundary>
	);
}
