'use client'

import { useEffect, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation"
import '../../../../styles/global.css'
import UiButton from '@/src/components/ui/Button/UiButton';
import UiForm from '@/src/components/ui/Form/UiForm';
import UiInput from '@/src/components/ui/Input/UiInput';
import UiIcon from '@/src/components/ui/Icon/UiIcon';
import AuthLayout from "../Authlayout"
import loginSchema from '../../../utils/validations/loginSchema'
import styles from './signin.module.scss'
import { useLoginUserMutation } from '@/src/redux/features/Account';

export default function Page() {
  const [inviteToken, setIniteToken] = useState<string | null>(null);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  
  const onSubmit = async (loginDetails: { email: string; password: string }) => {
    loginUser(loginDetails)
      .unwrap()
      .then((user) => {
        if (inviteToken) {
          router.push(`/invite?token=${inviteToken}`);
          // const acceptInvite = async () => {
          //   const loggedInUser = await api.getUser(user?.uid);
          //   const alredyInCompany = await api.doesDocumentExist(
          //     `companies/${inviteToken}/members`,
          //     user?.uid!,
          //   );
          //   if (!alredyInCompany && loggedInUser) {
          //     console.log('stage two');
          //     addMember({
          //       member: {
          //         id: loggedInUser?.id,
          //         birthday: loggedInUser.birthday,
          //         email: loggedInUser.email,
          //         level: loggedInUser.level,
          //         member_type: 'member',
          //         name: loggedInUser.name,
          //         phone: loggedInUser.phone,
          //         user_role: loggedInUser.user_role,
          //         gender: loggedInUser.gender,
          //       },
          //       companyId: inviteToken,
          //     });
          //     console.log('stage three');
          //     addOrganisation(inviteToken);
          //     setCookie('active_companyId', inviteToken, {
          //       maxAge: 30 * 24 * 60 * 60,
          //     });
          //     console.log('stage four');
          //   }
          // };
          // acceptInvite();
          // window.location.reload();
        } else{
          router.push('/dashboard');
        }
      });
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIniteToken(params.get('invite-token'));
    }
  }, []);

  return (
    <AuthLayout>
      <div className={styles.signin}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            marginBottom: '2rem',
          }}
        >
          Sign In to Woorkroom
        </h2>
        <div className={styles.form_container}>
          <UiForm onSubmit={onSubmit} schema={loginSchema}>
            {({ errors, register }) => (
              <div>
                <UiInput
                  register={register}
                  error={errors?.email?.message}
                  name="email"
                  label="Email Address"
                  placeholder="enter your email"
                  type="text"
                />
                <UiInput
                  register={register}
                  error={errors?.password?.message}
                  name="password"
                  label="Password"
                  placeholder="enter your password"
                  type="password"
                />
                <UiButton>
                  {isLoading ? 'Loading...' : 'Sign In'}
                  {!isLoading && <UiIcon size="24" icon="ArrowRight" />}
                </UiButton>

                <Link href="./signup">Dont have an account? sign up</Link>
              </div>
            )}
          </UiForm>
        </div>
      </div>
    </AuthLayout>
  );
}