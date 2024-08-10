'use client';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Welcome() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const captcha = useRef<any>();
  // const [captchaToken, setCaptchaToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      console.log(session);
      if (session.data.session === null) {
        onOpen();
      }
    })();
  }, [onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className='flex items-center justify-center w-full my-8'>
                <p className='font-bold text-4xl'>Welcome!</p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='flex items-center justify-center w-full'>
                <p>不正防止のため確認にご協力ください。</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className='flex items-center justify-center w-full my-8'>
                <HCaptcha
                  ref={captcha}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!}
                  onVerify={async (token) => {
                    // setCaptchaToken(token);
                    captcha.current.resetCaptcha();
                    await supabase.auth.signInAnonymously({
                      options: {
                        captchaToken: token,
                      },
                    });
                    onClose();
                  }}
                ></HCaptcha>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
