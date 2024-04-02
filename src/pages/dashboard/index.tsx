import Head from "next/head";
import { StubbedRecommendations } from "~/StubbedRecommendations";
import CostRecommendationsTable from "~/components/CostRecommendationsTable";
import { Layout } from "~/components/Layout";
import { NavBar } from "~/components/NavBar";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <CostRecommendationsTable
          data={StubbedRecommendations}
          className="max-w-[1000px]"
        />
      </Layout>
    </>
  );
}
