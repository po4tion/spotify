<h1 align="center">Welcome to Clone Spotify Web Player 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/yarn-%3E%3D1.22.5-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D8.1.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-14.18.1-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Clone Spotify Web Player

### 🏠 [Clone Spotify Web Player로 이동](https://spotify-po4tion.vercel.app/)

## 목차

1. [Spotify](#Spotify)
2. [설명](#설명)
3. [사용 방법](#사용-방법)
4. [주요 사용 기술](#주요-사용-기술)
5. [배포 환경](#배포-환경)
6. [제공 기능](#제공-기능)
7. [파일 관리](#파일-관리)
8. [개발자](#개발자)
9. [제보사항](#제보사항)

## Spotify

UI는 Spotify web player를 클론하였으며 Spotify API를 통해 나의 플레이리스트들을 조작할 수 있는 프로젝트입니다.

## 설명

- Spotify API를 
- Next.js를 통해 SSR, SEO, API Routes, font, image optimization 등을 적용
- Tailwind CSS를 통해 웹 UI 전체 페이지 적용(반응형 웹 적용)
- 상태 관리 라이브러리 Recoil 사용
- NextAuth.js로 Spotify OAuth 구현
- TypeScript 사용으로 에러 사전 방지

## 사용 방법
 
- 가장 먼저 [Spotify](https://www.spotify.com/kr-ko) 사이트에 들어가 웹 플레이어 혹은 데스크톱 응용 프로그램을 실행한 후 로그인합니다. 
- 그 후 [Clone Spotify Web Player](https://spotify-po4tion.vercel.app/)로 이동하여 로그인합니다.
- 이전 노래와 다음 노래 버튼은 Spotify 플레이어에서 현재 재생목록에 노래들을 추가하셔야 사용 가능합니다.
- 개인 플레이리스트에서 노래들을 선택하여 실행가능하며 이때 Spotfy 플레이어는 종료하시면 안됩니다(종료하시면 소리가 안나옵니다).
- 노래가 나오지 않을 경우 Spotify 플레이어에서 재생버튼을 한번 클릭해주세요.

## 주요 사용 기술

- React.js
- Next.js
- Tailwind CSS
- NextAuth.js
- TypeScript
- Recoil

## 배포 환경

- Vercel

## 제공 기능

1. 계정 관련
- 로그인
- 로그아웃

2. 노래 관련
- 자신이 추가한 플레이리스트 듣기
- Spotfy 플레이어로 현재 듣고 있던 음악 이어서 듣기
- 볼륨 조절
- 이전 노래
- 다음 노래

3. 가수 관련
- Spotify에서 제공하는 믹스 음악의 가수 클릭하여 해당 가수 믹스곡 리스트 보기

## 파일 관리

| 파일명     | 목적                      |
| ---------- | ------------------------- |
| atoms    | Recoil atom 정의                |
| components | SPOTIFY의 UI 컴포넌트     |
| lib        | 커스텀 모듈               |
| hooks     | 커스텀 훅             |
| pages      | 페이지 렌더링 & API Route |
| public     |  favicon  |
| styles       | Tailwind CSS 커스텀     |
| types      | 커스텀 타입 선언 파일     |


## 개발자

👤 **Kim DongGyu <po4tion0429@gmail.com>**

- Github: [@po4tion](https://github.com/po4tion)

## 제보사항

SPOTIFY 이용시 불편사항/불만사항 또는 오류가 발생했을 시 아래 페이지로 제보 부탁드립니다.<br> [issues page](https://github.com/po4tion/spotify)
