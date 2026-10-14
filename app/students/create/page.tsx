import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

async function createStudent(formData: FormData) {
  "use server";

  const studentCode = formData.get("studentCode") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const year = Number(formData.get("year"));

  await prisma.student.create({
    data: {
      studentCode,
      name,
      email: email || null,
      major,
      year,
    },
  });

  redirect("/students");
}

export default function CreateStudentPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#e6f1ff]">
          เพิ่มนักศึกษา
        </h1>

        <p className="mt-2 text-[#8892b0]">
          กรอกข้อมูลนักศึกษา
        </p>
      </div>

      <form
        action={createStudent}
        className="space-y-5 rounded-lg border border-[#233554] bg-[#112240] p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="studentCode"
            className="mb-2 block text-sm font-medium text-[#e6f1ff]"
          >
            รหัสนักศึกษา
          </label>

          <input
            id="studentCode"
            type="text"
            name="studentCode"
            required
            className="w-full rounded-md border border-[#233554] bg-[#0a192f] px-3 py-2 text-[#e6f1ff] outline-none placeholder:text-[#8892b0] focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda]/30"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#e6f1ff]"
          >
            ชื่อ-นามสกุล
          </label>

          <input
            id="name"
            type="text"
            name="name"
            required
            className="w-full rounded-md border border-[#233554] bg-[#0a192f] px-3 py-2 text-[#e6f1ff] outline-none placeholder:text-[#8892b0] focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda]/30"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#e6f1ff]"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            className="w-full rounded-md border border-[#233554] bg-[#0a192f] px-3 py-2 text-[#e6f1ff] outline-none placeholder:text-[#8892b0] focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda]/30"
          />
        </div>

        <div>
          <label
            htmlFor="major"
            className="mb-2 block text-sm font-medium text-[#e6f1ff]"
          >
            สาขา
          </label>

          <input
            id="major"
            type="text"
            name="major"
            required
            className="w-full rounded-md border border-[#233554] bg-[#0a192f] px-3 py-2 text-[#e6f1ff] outline-none placeholder:text-[#8892b0] focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda]/30"
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm font-medium text-[#e6f1ff]"
          >
            ชั้นปี
          </label>

          <input
            id="year"
            type="number"
            name="year"
            min="1"
            max="8"
            required
            className="w-full rounded-md border border-[#233554] bg-[#0a192f] px-3 py-2 text-[#e6f1ff] outline-none placeholder:text-[#8892b0] focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda]/30"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-[#64ffda] px-5 py-2 font-medium text-[#0a192f] hover:bg-[#4cd8b8]"
          >
            บันทึก
          </button>

          <a
            href="/students"
            className="rounded-md border border-[#233554] px-5 py-2 font-medium text-[#8892b0] hover:bg-[#233554] hover:text-[#e6f1ff]"
          >
            ยกเลิก
          </a>
        </div>
      </form>
    </main>
  );
}