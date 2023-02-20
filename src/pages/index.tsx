import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { _Region } from "~/constants/regions";
import { formatWhiteSpacesToUrl } from "~/utils/formatWhiteSpace";
import { api } from "~/utils/api";
import { Strategy } from "~/utils/tabnews";
import champions from "public/data/champions.json";

const Home: NextPage = () => {
    const [summonerName, setSummonerName] = useState("");
    const [region, setRegion] = useState("na");
    const postsQuery = api.tabnews.listPosts.useInfiniteQuery(
        { limit: 10, strategy: Strategy.NEW },
        {
            getNextPageParam: (prevPage) => prevPage.nextCursor,
        }
    );

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Summoner Name</h1>
                <input
                    type="search"
                    value={summonerName}
                    onChange={(e) => setSummonerName(e.currentTarget.value)}
                />
                <h2>Region</h2>
                <select
                    value={region}
                    onChange={(e) => setRegion(e.currentTarget.value)}
                >
                    {Object.keys(_Region).map((region) => (
                        <option key={region} value={region}>
                            {region.toUpperCase()}
                        </option>
                    ))}
                </select>
                <Link
                    href={`/${region}/${formatWhiteSpacesToUrl(summonerName)}`}
                >
                    Search
                </Link>
                <ul>
                    {postsQuery.data?.pages.map((page) =>
                        page.posts.map((post) => (
                            <li key={post.id}>
                                <p>
                                    {post.title} - {post.owner_username}
                                </p>
                            </li>
                        ))
                    )}
                </ul>
                <button
                    className="rounded bg-blue-500 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                    onClick={() => postsQuery.fetchNextPage()}
                >
                    {postsQuery.isFetchingNextPage
                        ? "Loading..."
                        : "Load next page"}
                </button>
                
                <ul>
                    {Object.keys(champions).map((key) => (
                        <div key={key}>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment  */}
                            {/* @ts-ignore */} {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                            {champions[key].name} {champions[key].title}
                        </div>
                    ))}
                </ul>
            </main>
        </>
    );
};

export default Home;
