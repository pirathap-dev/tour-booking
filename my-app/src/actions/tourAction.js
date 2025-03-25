import api from '../confiq/axiosConfig';
import { createReviewFail, createReviewRequest, createReviewSuccess, tourFail, tourRequest, tourSuccess } from '../slices/tourSlice';
import {toursFail, toursRequest, toursSuccess } from '../slices/toursSlice';

export const getTours = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {
        dispatch(toursRequest());

        let link = `/tours?page=${currentPage}`;

        if (keyword) {
            link += `&keyword=${keyword}`
        }
        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category) {
            link += `&category=${category}`
        }
        if (rating) {
            link += `&ratings=${rating}`
        }

        const { data } = await api.get(link);

        dispatch(toursSuccess(data));

    } catch (error) {
        dispatch(toursFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const getTour = id => async (dispatch) => {

    try {
        dispatch(tourRequest());
        const { data } = await api.get(`/tour/${id}`);
        dispatch(tourSuccess(data));

    } catch (error) {
        dispatch(tourFail({ error: error.response?.data?.message }));
    }
}

export const createReview = reviewData => async (dispatch) => {

    try {
        dispatch(createReviewRequest());
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const { data } = await api.put(`/review`, reviewData, config);
        dispatch(createReviewSuccess(data));

    } catch (error) {
        dispatch(createReviewFail({ error: error.response?.data?.message }));
    }
}


// export const getAdminProducts = async (dispatch) => {

//     try {
//         dispatch(adminProductsRequest());

//         const { data } = await api.get(`/admin/products`);

//         dispatch(adminProductsSuccess(data));

//     } catch (error) {
//         dispatch(adminProductsFail({ error: error.response?.data?.message || 'An error occurred' }));
//     }
// }

// export const createNewProduct = productData => async (dispatch) => {

//     try {
//         dispatch(newProductRequest())

//         const { data } = await api.post(`/admin/product/new`, productData);

//         dispatch(newProductSuccess(data))

//     } catch (error) {

//         dispatch(newProductFail(error.response.data.message))
//     }

// }

// export const deleteProduct = id => async (dispatch) => {

//     try {
//         dispatch(deleteProductRequest());

//         await api.delete(`/admin/product/${id}`);

//         dispatch(deleteProductSuccess());

//     } catch (error) {
//         dispatch(deleteProductFail({ error: error.response?.data?.message || 'An error occurred' }));
//     }
// }

// export const updateProduct = (id, productData) => async (dispatch) => {

//     try {
//         dispatch(updateProductRequest())

//         const { data } = await api.put(`/admin/product/${id}`, productData);

//         dispatch(updateProductSuccess(data))

//     } catch (error) {

//         dispatch(updateProductFail(error.response.data.message))
//     }

// }

// export const getReviews = id => async (dispatch) => {

//     try {
//         dispatch(reviewsRequest());


//         const { data } = await api.get(`/admin/reviews`, { params: { id } });

//         dispatch(reviewsSuccess(data));

//     } catch (error) {
//         dispatch(reviewsFail({ error: error.response?.data?.message || 'An error occurred' }));
//     }
// }

// export const deleteReviews = (productId, id) => async (dispatch) => {

//     try {
//         dispatch(deleteReviewRequest());


//         await api.delete(`/admin/reviews`, { params: { productId,id } });

//         dispatch(deleteReviewSuccess());

//     } catch (error) {
//         dispatch(deleteReviewFail({ error: error.response?.data?.message || 'An error occurred' }));
//     }
// }