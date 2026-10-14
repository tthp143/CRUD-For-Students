# CRUD For Students

เว็บแอปพลิเคชันสำหรับจัดการข้อมูลนักศึกษา พัฒนาด้วย **Next.js, TypeScript, Prisma และ SQLite** รองรับการเพิ่ม แสดง แก้ไข และลบข้อมูลนักศึกษา (CRUD)

## คุณสมบัติ

- แสดงรายการนักศึกษาทั้งหมด
- เพิ่มข้อมูลนักศึกษา
- แก้ไขข้อมูลนักศึกษา
- ลบข้อมูลนักศึกษาพร้อมหน้าต่างยืนยัน
- จัดเก็บข้อมูลด้วยฐานข้อมูล SQLite

## เทคโนโลยีที่ใช้

- Next.js
- React
- TypeScript
- Prisma ORM
- SQLite

## สิ่งที่ต้องติดตั้งก่อน

- [Node.js](https://nodejs.org/) เวอร์ชันที่รองรับ Next.js 16 (แนะนำ Node.js 20.9 ขึ้นไป)
- npm ซึ่งติดตั้งมาพร้อม Node.js
- Git

ตรวจสอบการติดตั้งได้ด้วยคำสั่ง:

```bash
node -v
npm -v
git --version
```

## วิธีติดตั้งและเริ่มใช้งาน

### 1. ดาวน์โหลดโปรเจกต์

เปิด Terminal หรือ Command Prompt แล้วรัน:

```bash
git clone https://github.com/tthp143/CRUD-For-Students.git
cd CRUD-For-Students
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่าฐานข้อมูล

สร้างไฟล์ชื่อ `.env` ที่โฟลเดอร์หลักของโปรเจกต์ แล้วเพิ่ม:

```env
DATABASE_URL="file:./dev.db"
```

โปรเจกต์ใช้ SQLite จึงไม่จำเป็นต้องติดตั้ง MySQL หรือเปิด XAMPP

> **หมายเหตุเกี่ยวกับ Prisma 7:** หากในโปรเจกต์ยังไม่มีไฟล์ `prisma.config.ts` ให้สร้างไฟล์นี้ที่โฟลเดอร์หลัก แล้วใส่โค้ดต่อไปนี้ เพื่อให้คำสั่ง Prisma CLI อ่านค่า `DATABASE_URL` ได้

```typescript
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

### 4. สร้าง Prisma Client และฐานข้อมูล

รันคำสั่งต่อไปนี้ตามลำดับ:

```bash
npx prisma generate
npx prisma db push
```

คำสั่ง `prisma generate` ใช้สร้าง Prisma Client ส่วน `prisma db push` ใช้สร้างหรือปรับโครงสร้างฐานข้อมูลให้ตรงกับ `prisma/schema.prisma`

### 5. เปิดเซิร์ฟเวอร์

```bash
npm run dev
```

เมื่อเห็นว่าเซิร์ฟเวอร์เริ่มทำงานแล้ว ให้เปิดเบราว์เซอร์ไปที่:

- หน้าแรก: http://localhost:3000
- **หน้าจัดการนักศึกษา: http://localhost:3000/students**

กด `Ctrl + C` ใน Terminal หากต้องการหยุดเซิร์ฟเวอร์

## วิธีใช้งานระบบ

### ดูข้อมูลนักศึกษา

1. เปิด http://localhost:3000/students
2. ระบบจะแสดงรายการนักศึกษา พร้อมจำนวนรายการทั้งหมด

### เพิ่มนักศึกษา

1. ไปที่หน้า `/students`
2. กดปุ่ม **เพิ่มนักศึกษา**
3. กรอกรหัสนักศึกษา ชื่อ-นามสกุล อีเมล สาขา และชั้นปี
4. ส่งแบบฟอร์มเพื่อบันทึกข้อมูล ระบบจะกลับไปยังหน้า `/students`

### แก้ไขข้อมูลนักศึกษา

1. ไปที่หน้า `/students`
2. กดปุ่ม **แก้ไข** ในแถวของนักศึกษาที่ต้องการ
3. แก้ไขข้อมูล แล้วบันทึก ระบบจะกลับไปยังหน้า `/students`

### ลบนักศึกษา

1. ไปที่หน้า `/students`
2. กดปุ่ม **ลบ** ในแถวของนักศึกษาที่ต้องการ
3. ยืนยันการลบในหน้าต่างที่แสดงขึ้น

> การลบข้อมูลจะนำรายการนักศึกษานั้นออกจากฐานข้อมูล ควรตรวจสอบรายการก่อนยืนยัน

## โครงสร้างไฟล์สำคัญ

```text
CRUD-For-Students/
├── app/
│   ├── lib/
│   │   └── prisma.ts             # การเชื่อมต่อ Prisma กับ SQLite
│   ├── students/
│   │   ├── page.tsx              # แสดงรายการนักศึกษา
│   │   ├── create/
│   │   │   └── page.tsx          # เพิ่มนักศึกษา
│   │   ├── [id]/
│   │   │   └── edit/
│   │   │       └── page.tsx      # แก้ไขข้อมูลนักศึกษา
│   │   └── delete-button.tsx     # ปุ่มลบข้อมูล
│   └── page.tsx                  # หน้าแรก
├── prisma/
│   └── schema.prisma             # โครงสร้างฐานข้อมูล
├── package.json
└── README.md
```

## คำสั่งที่ใช้บ่อย

| คำสั่ง | รายละเอียด |
| --- | --- |
| `npm install` | ติดตั้งแพ็กเกจ |
| `npm run dev` | เปิดเซิร์ฟเวอร์สำหรับพัฒนา |
| `npm run build` | สร้าง Build สำหรับใช้งานจริง |
| `npm run start` | เปิดเซิร์ฟเวอร์จาก Build |
| `npx prisma generate` | สร้าง Prisma Client |
| `npx prisma db push` | ซิงก์โครงสร้างฐานข้อมูลกับ Schema |

## การแก้ปัญหาเบื้องต้น

- **ไม่สามารถเชื่อมต่อฐานข้อมูลได้:** ตรวจสอบว่าไฟล์ `.env` อยู่ที่โฟลเดอร์หลัก และกำหนด `DATABASE_URL="file:./dev.db"` แล้ว
- **Prisma Client ยังไม่ถูกสร้าง:** รัน `npx prisma generate` อีกครั้ง
- **ไม่พบตารางหรือข้อมูลนักศึกษา:** รัน `npx prisma db push` แล้วเริ่มเซิร์ฟเวอร์ใหม่
- **พอร์ต 3000 ถูกใช้งานอยู่:** ปิดโปรแกรมที่ใช้พอร์ตดังกล่าว หรือใช้พอร์ตอื่นตามข้อความที่ Terminal แจ้ง

## ผู้พัฒนา

Repository: https://github.com/tthp143/CRUD-For-Students
