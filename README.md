# MCVot - 디스코드 인증 봇

### 이 봇은 당신의 마인크래프트 계정을 마인크래프트 서버를 통해 디스코드로 인증을 해줄 수 있게 해주는 봇 입니다.

<br>

### 사용 방법.

1. 이 봇의 소스 코드를 다운로드 한 뒤 봇에 적용하거나 저의 봇을 디스코드 서버에 [초대](https://discord.com/oauth2/authorize?client_id=1023276509248639078&permissions=8&scope=bot%20applications.commands)하시면 됩니다. <br>
   > 만약 소스 코드를 사용 하실려면..
   > - 데이터를 저장하기 위해 데이터베이스도 필요합니다. (MySQL 기반)
   > - .env 파일 설정 방법은 하단을 참고하세요.
2. 마인크래프트 서버에 인증 [플러그인](https://github.com/devcomi/mcvot-plugin)을 추가합니다.

### .env 파일 예시.

```javascript
TOKEN=토큰 // 봇의 토큰
CLIENT_ID=아이디 // 봇의 아이디
GUILD_ID=길드_아이디 // 길드의 아이디
HOST="데이터베이스_서버_주소" // 데이터베이스 서버 주소
DATABASE=데이터베이스_명 // 데이터베이스 이름
USER=데이터베이스_유저_이름 // 데이터베이스로 로그인할 유저의 이름
PASSWORD=데이터베이스_유저_비밀번호 // 유저의 비밀번호
```
