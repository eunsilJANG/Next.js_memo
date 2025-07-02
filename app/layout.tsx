import "#/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: { default: "메모 앱", template: "%s | 메모 앱" },
	metadataBase: new URL("https://memo-app.vercel.app"),
	description:
		"생각과 아이디어를 정리하는 스마트 메모 앱. 카테고리별 분류, 태그 시스템, 검색 기능을 제공합니다.",
	openGraph: {
		title: "메모 앱",
		description:
			"생각과 아이디어를 정리하는 스마트 메모 앱. 카테고리별 분류, 태그 시스템, 검색 기능을 제공합니다.",
		images: [`/api/og?title=메모 앱`],
	},
	twitter: { card: "summary_large_image" },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko" className="[color-scheme:dark]">
			<body
				className={`overflow-y-scroll bg-gray-950 font-sans antialiased ${inter.className}`}
			>
				<div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
			</body>
		</html>
	);
}
