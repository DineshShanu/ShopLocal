import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/itemSlice";
import { fetchStatusAction } from "../store/fetchStatusSlice";

const FetchItems = () => {
    const fetchStatus = useSelector((store) => store.fetchStatus);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (fetchStatus.fetchDone) return;

        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(fetchStatusAction.markFetchingStarted());
        fetch('http://localhost:4000/items', { signal })
            .then((res) => res.json())
            .then(({ items }) => {
                dispatch(fetchStatusAction.markFetchDone());
                dispatch(fetchStatusAction.markFetchingFinished());
                dispatch(itemsAction.addInitialItem(items[0]));
            })
            .catch(err => {
                if (signal.aborted) {
                    console.log('Aborted');
                }
            })
        return () => {
            controller.abort();
        };
    }, [fetchStatus]);

    return (
        <></>
    )
}

export default FetchItems;