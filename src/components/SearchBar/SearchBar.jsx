import toast, { Toaster } from "react-hot-toast";

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
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Toaster position="top-right" reverseOrder={false} />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
