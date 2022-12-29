import React from 'react';
import './App.css';
import {Main} from "./components/Main";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {store} from "./store/store";
import {Provider} from "react-redux";

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<BrowserRouter>
					<Main/>
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	);
}