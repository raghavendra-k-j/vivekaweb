import type { Route } from './+types/SubmitRoute';
import { getFormService } from '~/domain/forms/services/FormsService';
import { data, useRouteLoaderData } from 'react-router';
import { AppRoutes } from '~/routes/AppRoutes';
import { SubmitProvider } from './SubmitProvider';
import type { SubmitFormPageData } from '~/domain/forms/types/SubmitFormPageData';
import { useMemo } from 'react';
import { FormDetail } from '~/domain/forms/models/FormDetail';
import { observer } from 'mobx-react-lite';
import { useSubmitStore } from './SubmitContext';
import { CurrentFragment } from "./models/CurrentFragment";
import { PreviewFragment } from './preview/PreviewFragment';



export async function loader(props: Route.LoaderArgs) {
  const formDetailRes = await getFormService().getFormDetail({ permalink: props.params.permalink });
  if (formDetailRes.isError) {
    throw new Response(formDetailRes.error.message, {});
  }
  const formDetail = formDetailRes.data;
  return {
    formDetail: formDetail.serialize(),
    webPageTitle: formDetail.title,
  };
}


export function meta({ data }: Route.MetaArgs) {
  return [
    {
      title: data.webPageTitle,
    },
    {
      property: 'og:title',
      content: data.webPageTitle,
    }
  ];
}



export default function SubmitPage() {
  const loaderData = useRouteLoaderData(AppRoutes.submitFormId) as SubmitFormPageData;
  const formDetailJson = loaderData.formDetail;
  const formDetail = useMemo(() => {
    return FormDetail.deserialize(formDetailJson);
  }, [formDetailJson]);


  return (
    <SubmitProvider formDetail={formDetail}>
      <CurrentFragmentBody />
    </SubmitProvider>
  );
}


const CurrentFragmentBody = observer(() => {
  const submitStore = useSubmitStore();
  switch (submitStore.currentFragment) {
    case CurrentFragment.Preview:
      return <PreviewFragment/>
    case CurrentFragment.AlreadySubmitted:
      return <div>Already Submitted</div>;
    default:
      return <div>Unknown Fragment</div>;
  }
});
