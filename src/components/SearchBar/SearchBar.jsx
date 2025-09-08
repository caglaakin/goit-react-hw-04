import toast, { Toaster } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import css from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;

    if (query.trim() === "") {
      const message = "Please enter a search query.";
      toast.error(message, { duration: 2000 });
      return;
    }
    onSearch(query);
    form.reset();
  };

  return (
    <header className={css.headerSearch}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.buttonSearch}>
          <CiSearch className={css.iconSearch} />
        </button>
        <input
          name="query"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </header>
  );
};
