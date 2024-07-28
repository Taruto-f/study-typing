import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { Source_Code_Pro } from 'next/font/google';

const SourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
});

export default function Play() {
  return (
    <>
      <div className='py-4 w-full'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center w-full'>
              <p className={`${SourceCodePro.className} text-lg`}>60</p>
            </div>
          </CardHeader>
          <Divider></Divider>
          <CardBody>
            <div className='flex flex-col justify-center items-center h-96 gap-4'>
              <p className='text-xl'>国語</p>
              <div className='flex flex-col justify-center items-center m-8'>
                <h1 className='text-6xl font-bold'>単語</h1>
                <p className='text-lg'>たんご</p>
              </div>
              <p className='text-lg'>単語の説明</p>
              <p className={`${SourceCodePro.className} text-2xl`}>
                t<span className='text-default-400'>ango</span>
              </p>
            </div>
          </CardBody>
          <Divider></Divider>
          <CardFooter>
            <div className='h-20 flex items-center w-full justify-center space-x-4'>
              <div className='flex flex-col items-center w-full'>
                <p>得点</p>
                <p className={`${SourceCodePro.className} text-3xl`}>1</p>
              </div>
              <Divider orientation='vertical'></Divider>
              <div className='flex flex-col items-center w-full'>
                <p>回答数</p>
                <p className={`${SourceCodePro.className} text-3xl`}>0</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
