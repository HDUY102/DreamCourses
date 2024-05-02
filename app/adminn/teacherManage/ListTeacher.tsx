"use client";
import React, { useState } from 'react'
import TeacherList from './TeacherList';
import { useTeacherStore } from "@/app/lib/hooks/useTeacherStore"
const ListTeacher = () => {
  const { teachers } = useTeacherStore();
  const [teachersToList] = useState(teachers);
    return (
    <div>
      <TeacherList teachersToList={teachersToList} />
    </div>
  )
}

export default ListTeacher