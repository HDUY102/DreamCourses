// "use client"
import React, { useEffect, useState } from 'react'
import { IoIosLock,IoIosUnlock} from "react-icons/io";
const TeacherItem = ({ teacher }: { teacher: any}) => {
  const createDate = new Date(teacher.dateCreate);
  const formattedDate = createDate.toISOString().split('T')[0];
  const [isLocked, setIsLocked] = useState(teacher.isLocked);
  

  const toggleLock = async () => {
    try {
      const response = await fetch(`/api/teacher/${teacher.idUser}`, {
        method: 'PATCH',
        body: JSON.stringify({ isLocked: !isLocked }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsLocked(!isLocked);
        console.log('Cập nhật trạng thái mở/khóa tài khoản thành công');
      } else {
        console.error('Lỗi cập nhật trạng thái mở/khóa tài khoản:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  return (
    <table className="ml-1">
      <tbody>
        <tr className='w-[125%] table table-fixed'>
          <td>{teacher.username}</td>
          <td>{formattedDate}</td>
          <td className='text-white flex '>
            {isLocked ? (
              <button onClick={toggleLock} className="text-red-400 border-none w-5 hover:text-red-500 text-2xl"><IoIosLock/></button>
            ) : (
              <button onClick={toggleLock} className="text-green-400 border-none w-5 hover:text-green-500 text-2xl"><IoIosUnlock /></button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TeacherItem