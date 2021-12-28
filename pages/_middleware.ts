/* 
  /pages 내의 모든 경로에서 실행 (protect route 기능 구현)
*/

import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextApiRequest) {
	const token = await getToken({
		req,
		secret: process.env.JWT_SECRET,
		secureCookie:
			process.env.NEXTAUTH_URL?.startsWith('https://') ??
			!!process.env.VERCEL_URL,
	});

	const { url: pathname } = req;

	if (token && pathname === '/login') {
		return NextResponse.redirect('/');
	}
	// url이 api/auth 경로를 포함하고 있거나 token(로그인 성공)
	// 값을 가지고 있다면 미들웨어 체인을 계속 진행
	if (pathname?.includes('/api/auth') || token) {
		return NextResponse.next();
	}

	// url이 '/login'도 아니고 token 값도 없다면 로그인 페이지로 redirect
	if (!token && pathname !== '/login') {
		return NextResponse.redirect('/login');
	}
}
