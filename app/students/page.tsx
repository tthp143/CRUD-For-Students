import prisma from "@/app/lib/prisma";
import DeleteButton from "./delete-button";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#e6f1ff]">
          Student Management
        </h1>

        <p className="mt-2 text-[#8892b0]">
          จำนวนนักศึกษา:{" "}
          <strong className="text-[#64ffda]">{students.length}</strong> คน
        </p>
      </div>

        <a
    href={`/students/create`}
    className="inline-block rounded bg-[#64ffda] my-5 px-6 py-2.5 text-sm font-medium text-[#0a192f] shadow-md transition duration-150 ease-in-out hover:bg-[#4cd8b8] hover:shadow-lg focus:bg-[#4cd8b8] focus:outline-none focus:ring-2 focus:ring-[#64ffda] focus:ring-offset-2 focus:ring-offset-[#0a192f]"
  >
    เพิ่มนักศึกษา
  </a>

      <div className="overflow-x-auto rounded-lg border border-[#233554]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#112240]">
            <tr>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">ID</th>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">
                รหัสนักศึกษา
              </th>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">
                ชื่อ
              </th>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">
                Email
              </th>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">
                สาขา
              </th>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">
                ชั้นปี
              </th>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">
                สถานะ
              </th>
              <th className="px-4 py-3 font-semibold text-[#e6f1ff]">
                จัดการ
            </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t border-[#233554] text-[#8892b0] hover:bg-[#112240]"
              >
                <td className="px-4 py-3">
                  {student.id}
                </td>

                <td className="px-4 py-3">
                  {student.studentCode}
                </td>

                <td className="px-4 py-3 font-medium text-[#e6f1ff]">
                  {student.name}
                </td>

                <td className="px-4 py-3">
                  {student.email ?? "-"}
                </td>

                <td className="px-4 py-3">
                  {student.major}
                </td>

                <td className="px-4 py-3">
                  {student.year}
                </td>

                <td className="px-4 py-3">
                  {student.status ? (
                    <span className="rounded-full bg-[#64ffda]/10 px-3 py-1 text-xs font-medium text-[#64ffda]">
                      กำลังศึกษา
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#233554] px-3 py-1 text-xs font-medium text-[#8892b0]">
                      ไม่ใช้งาน
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                <a
                    href={`/students/${student.id}/edit`}
                    className="rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-600"
                >
                    แก้ไข
                </a>
                <DeleteButton id={student.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}