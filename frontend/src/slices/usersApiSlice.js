import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/profile/`,
        method: "GET",
      }),
    }),
    getOtherUserProfile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/profile/${data.username}`,
        method: "GET",
      }),
    }),
    addFriend: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/friend`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteFriend: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/friend`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserProfileQuery,
  useGetOtherUserProfileQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
} = userApiSlice;
