import React from "react";
import TeacherItem from "./TeacherItem";

const TeacherList = ({teachersToList,onDelete,}: {teachersToList: any;onDelete: (id: number) => void}) => {
  return (
    <div className="ml-3 border-2">
      <table className="border-b-2  w-[100%] table table-fixed">
        <thead>
          <tr>
            <th>Username</th>
            <th>Ngày tạo tài khoản</th>
            <th></th>
          </tr>
        </thead>
      </table>
      {teachersToList?.map((teacher: any) => (
        <TeacherItem key={teacher.idUser} teacher={teacher} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TeacherList;
