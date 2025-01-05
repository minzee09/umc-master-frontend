#!/bin/sh

# 현재 디렉토리를 umc-master로 이동
cd umc-master

# output 디렉토리 생성 (이미 존재하면 삭제 후 생성)
rm -rf output
mkdir output

# umc-master 내부의 모든 파일을 output 디렉토리로 복사
cp -R ./* ./output

# 필요한 경우 output 디렉토리에서 추가 작업 수행 가능
