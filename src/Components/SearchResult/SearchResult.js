import { useState } from "react";
import useFetch from "../../hooks/useFetch"
import { IconButton } from "@chakra-ui/react";
import { AddIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function SearchResult({ movieData }) {
  const [fetchContent, setFetchContent] = useState({
    url: null,
    method: null,
    body: null,
  });
  useFetch(fetchContent.url, fetchContent.method, fetchContent.body);
  let navigate = useNavigate();

  // sets data on function call to match the movie selected and passes the data
  // to be used by the useFetch hook
  const defineFetchContent = (arr) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/movie`;
    const method = "POST";
    const body = JSON.stringify({
      type: "movie",
      user: `${localStorage.getItem("guest")}`,
      title: arr.Title,
      poster: arr.Poster,
      year: arr.Year,
      id: arr.imdbID,
    });
    setFetchContent({ url: url, method: method, body: body });
  };

  const moreMovieInfo = (id) => {
    navigate(`/page/${id}`, {
      state: id,
      replace: true,
    });
  }

  return (
    <div className="search-styling">
      {movieData?.map((arr, index) => {
        if (
          arr === "Movie not found!" ||
          arr === "Please enter a movie title."
        ) {
          return <div key={index}>{arr}</div>;
        }
        return (
          <div key={index} className="poster-container">
            <img className="poster-styling" src={arr.Poster} alt={arr.Title} />
            <div className="poster-container-overlay">
              <div className="poster-container-title">{arr.Title}</div>
              <div className="poster-container-title">{arr.Year}</div>
              <div className="poster-button-container">
                <IconButton
                  className="poster-button"
                  onClick={() => defineFetchContent(arr)}
                  size="sm"
                  bg="gray.800"
                  _hover={{ backgroundColor: "gray.700"}}
                  _active={{ backgroundColor: "gray.500"}}
                  icon={<AddIcon color="gray.400"/>}
                />
                <IconButton
                  onClick={() => moreMovieInfo(arr.imdbID)}
                  size="sm"
                  bg="gray.800"
                  _hover={{ backgroundColor: "gray.700"}}
                  _active={{ backgroundColor: "gray.500"}}
                  icon={<InfoOutlineIcon color="gray.400"/>}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResult;
