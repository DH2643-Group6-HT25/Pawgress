import type { Dispatch } from "redux";
import { fetchAffirmation } from "../../api/affirmation";
import { setAffirmation, setLoading, setError } from "./affirmationReducer";

export const fetchAffirmationThunk = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true)); // Set loading state to true
  dispatch(setError(null)); // Clear any previous errors

  try {
    const data = await fetchAffirmation(); // Call the API
    dispatch(setAffirmation(data.text)); // Assuming the API returns { text: "..." }
  } catch (error) {
    dispatch(setError("Failed to fetch affirmation. Please try again."));
  } finally {
    dispatch(setLoading(false)); // Set loading state to false
  }
};
