const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search)
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim())
}

async function searchMovie(imdbID) {

    let response = await fetch(`https://www.omdbapi.com/?apikey=676f2cc7&i=${imdbID}&plot=full`);
    let data = await response.json()
    console.log(data);

    if (data.Response === "True") {
        displayMovie(data)
    } else {
        console.log(data.Error);
    }

}


function displayMovie(data) {

    movieDetail.innerHTML = `
        <div class="rounded-xl border border-gray-800 bg-[#111113] p-5 sm:p-6">

            <div class="grid grid-cols-1 gap-7 md:grid-cols-[260px_1fr]">

                <!-- POSTER -->
                <div>
                    <img
                        src="${data.Poster}"
                        alt="${data.Title}"
                        class="w-full max-w-[280px] mx-auto rounded-lg object-cover md:max-w-none"
                    >
                </div>


                <!-- MOVIE INFORMATION -->
                <div>

                    <h1 class="text-3xl font-bold sm:text-4xl">
                        ${data.Title}
                    </h1>


                    <!-- TAGS -->
                    <div class="mt-4 flex flex-wrap gap-2">

                        <span class="rounded bg-gray-800 px-3 py-1 text-sm text-gray-300">
                            ${data.Year}
                        </span>

                        <span class="rounded bg-gray-800 px-3 py-1 text-sm text-gray-300">
                            ${data.Rated}
                        </span>

                        <span class="rounded bg-gray-800 px-3 py-1 text-sm text-gray-300">
                            ${data.Runtime}
                        </span>

                        <span class="rounded border border-red-900 bg-red-950 px-3 py-1 text-sm text-red-400">
                            ${data.Genre}
                        </span>

                        <span class="rounded border border-yellow-900 bg-yellow-950 px-3 py-1 text-sm text-yellow-400">
                            IMDb: ${data.imdbRating} / 10
                        </span>

                    </div>


                    <!-- PLOT -->
                    <div class="mt-5 rounded-lg border border-gray-800 bg-[#0b0b0d] p-4">

                        <p class="mb-2 text-xs font-bold uppercase text-red-500">
                            Plot Overview
                        </p>

                        <p class="text-sm leading-6 text-gray-300">
                            ${data.Plot}
                        </p>

                    </div>


                    <!-- DIRECTOR / WRITER -->
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <section class="rounded-lg border border-gray-800 bg-[#0d0d0f] p-4">

                            <p class="text-xs uppercase text-gray-500">
                                Director
                            </p>

                            <p class="mt-1 text-sm font-semibold">
                                ${data.Director}
                            </p>

                        </section>


                        <section class="rounded-lg border border-gray-800 bg-[#0d0d0f] p-4">

                            <p class="text-xs uppercase text-gray-500">
                                Writer
                            </p>

                            <p class="mt-1 text-sm font-semibold">
                                ${data.Writer}
                            </p>

                        </section>

                    </div>


                    <!-- ACTORS -->
                    <div class="mt-4 rounded-lg border border-gray-800 bg-[#0d0d0f] p-4">

                        <p class="text-xs uppercase text-gray-500">
                            Actors
                        </p>

                        <p class="mt-1 text-sm font-semibold">
                            ${data.Actors}
                        </p>

                    </div>


                    <!-- LANGUAGE / COUNTRY -->
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <section class="rounded-lg border border-gray-800 bg-[#0d0d0f] p-4">

                            <p class="text-xs uppercase text-gray-500">
                                Language
                            </p>

                            <p class="mt-1 text-sm font-semibold">
                                ${data.Language}
                            </p>

                        </section>


                        <section class="rounded-lg border border-gray-800 bg-[#0d0d0f] p-4">

                            <p class="text-xs uppercase text-gray-500">
                                Country
                            </p>

                            <p class="mt-1 text-sm font-semibold">
                                ${data.Country}
                            </p>

                        </section>

                    </div>


                    <!-- IMDB BUTTON -->
                    <a
                        href="https://www.imdb.com/title/${data.imdbID}"
                        target="_blank"
                        class="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        View on IMDb →
                    </a>

                </div>

            </div>

        </div>
    `;
}