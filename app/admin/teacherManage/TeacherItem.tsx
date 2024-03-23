import React from 'react'

const TeacherItem = ({ teacher, onDelete }: { teacher: any; onDelete: (id: number) => void }) => {
  const handleDelete = () => {
    const shouldDelete = window.confirm('Bạn thực sự muốn xóa?');
    if (shouldDelete) {
      onDelete(teacher.idUser);
    }
  };

  return (
    <table className=" w-[100%]">
      <tbody>
        <tr className='border-b-2 table table-fixed'>
          <td>{teacher.username}</td>
          {/* <td>{teacher.date}</td> */}
          <td>{teacher.date?.toString()}</td>
          {/* <td dangerouslySetInnerHTML={{ __html: teacher.Content }}></td> */}
          <td className='text-white flex '>
            <button onClick={handleDelete} className="text-red-400 border-none w-5 hover:text-red-500">Xóa</button>
            {/* <Link href={`/admin/teacherManage/updateAcountTeacher/${teacher.idUser}`}>
              <button className="text-green-400 border-none hover:text-green-500">Sửa</button>
            </Link> */}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TeacherItem