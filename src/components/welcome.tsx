'use client';

import { is_session } from '@/utils/supabase/auth';
import { supabase } from '@/utils/supabase/client';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useRef } from 'react';

export default function Welcome() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const captcha = useRef<HCaptcha>(null);
  // const [captchaToken, setCaptchaToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (!(await is_session())) {
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
              <div className='flex flex-col gap-y-2 items-center justify-center w-full'>
                <p>Study Typingへようこそ!</p>
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
                    captcha.current!.resetCaptcha();
                    await supabase.auth.signInAnonymously({
                      options: {
                        captchaToken: token,
                      },
                    });
                    onClose();
                    window.location.reload();
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
