import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8080"; // Update the API base URL to your backend server address

interface TodoItem {
  content: string;
}

