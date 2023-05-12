import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    //method gets the todo by querying directly
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    // this method adds the todos by using builder.mutation
    addTodo: builder.mutation({
      query: (todo) => ({ url: "/todos", method: "POST", body: todo }),
      invalidatesTags: ["Todos"],
    }),
    //this method updates the todos using the PATCH method.
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
    }),
    //this method deletes the todo using the DELETE method
    deleteTodo: builder.mutation({
      query: ({ id }) => ({ url: `/todos/${id}`, method: "DELETE", body: id }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
