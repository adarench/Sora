import Head from "next/head";
import CostRecommendationsTable from "~/components/CostRecommendationsTable";
import { Layout } from "~/components/Layout";
import { StubbedRecommendations } from "~/StubbedRecommendations";

export default function RecommendationsPage() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <CostRecommendationsTable data={StubbedRecommendations} />
      </Layout>
    </>
  );
}
