import React from "react";
import styles from "@/app/layOut/search/Search.module.css";

import { MdSearch } from "react-icons/md";

const Search = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <MdSearch />
        <input type="text" placeholder="Search..." className={styles.input} />
      </div>
    </div>
  );
};

export default Search;