"use client";
import React, { useState } from 'react'
import TeacherList from './TeacherList';
import { useTeacherStore } from "@/app/lib/hooks/useTeacherStore"
const ListTeacher = () => {
  const { teachers } = useTeacherStore();
  const [teachersToList] = useState(teachers);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/admin/teacherManage/api/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert("Xóa thành công")
      window.location.reload();
    } else {
      console.error('Lỗi xóa giảng viên không thành công:', response.statusText);
    }
  };
    return (
    <div>
        <TeacherList teachersToList={teachersToList} onDelete={handleDelete} />
    </div>
  )
}

export default ListTeacher