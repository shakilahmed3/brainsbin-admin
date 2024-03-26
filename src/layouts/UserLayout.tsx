// ** React Imports
import { ReactNode, useContext } from 'react'

// ** MUI Imports
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { AuthContext } from 'src/@core/context/authContext'
import { useUser } from 'src/@core/lib/react-query/user/userQueries'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  const { isLoading, data, isError, error } = useUser()

  //auth context
  const authContext = useContext(AuthContext) || {
    loading: true,
    authState: {
      token: '',
      user: {
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        role: ''
      }
    },
    isUserAuthenticated: () => false,
    setAuthState: data => data
  }

  const loading = authContext.loading
  const isAuthenticated = authContext.isUserAuthenticated()

  // let loading = false

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const UpgradeToProImg = () => {
    return (
      <Box sx={{ mx: 'auto' }}>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
        >
          <img width={230} alt='upgrade to premium' src={`/images/misc/upgrade-banner-${settings.mode}.png`} />
        </a>
      </Box>
    )
  }

  return (
    <>
      {loading || !isAuthenticated ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <VerticalLayout
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          verticalNavItems={VerticalNavItems()} // Navigation Items
          // afterVerticalNavMenuContent={UpgradeToProImg}
          verticalAppBarContent={(
            props // AppBar Content
          ) => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )}
        >
          {children}
          {/* <UpgradeToProButton /> */}
        </VerticalLayout>
      )}
    </>
  )
}

export default UserLayout
