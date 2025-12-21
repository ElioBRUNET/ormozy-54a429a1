import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ormozyMascots from "@/assets/ormozy-mascots.webp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const deepLinkTriggeredRef = useRef(false);
  const hasNavigatedRef = useRef(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri');

  useEffect(() => {
    const currentRedirectUri = searchParams.get('redirect_uri');
    console.log('Auth page loaded. Redirect URI:', currentRedirectUri);

    // Store redirect_uri in localStorage to persist through OAuth flow
    if (currentRedirectUri && currentRedirectUri.startsWith('ormozy://')) {
      console.log('App login flow detected - storing redirect_uri:', currentRedirectUri);
      localStorage.setItem('ormozy_redirect_uri', currentRedirectUri);
      // Don't check for existing session, let user log in fresh
    } else {
      // Clear any stored redirect_uri if not in app flow
      localStorage.removeItem('ormozy_redirect_uri');
      // Normal web flow - check if user is already logged in
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          console.log('Existing session found, redirecting to dashboard');
          navigate("/dashboard");
        }
      });
    }

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);

      if (!session) return;

      console.log('Auth state change session object:', session);

      // Get redirect_uri from localStorage (preferred) or URL params
      const storedRedirectUri = localStorage.getItem('ormozy_redirect_uri');
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUriFromUrl = storedRedirectUri || urlParams.get('redirect_uri');
      const isAppFlow = redirectUriFromUrl?.startsWith('ormozy://');
      const hasTokens = Boolean(session.access_token && session.refresh_token);
      
      console.log('Stored redirect_uri:', storedRedirectUri);
      console.log('URL redirect_uri:', urlParams.get('redirect_uri'));
      console.log('Final redirect_uri to use:', redirectUriFromUrl);

      const accessTokenPreview = session.access_token
        ? `${session.access_token.slice(0, 20)}... (len=${session.access_token.length})`
        : 'missing';
      const refreshTokenPreview = session.refresh_token
        ? `${session.refresh_token.slice(0, 20)}... (len=${session.refresh_token.length})`
        : 'missing';

      console.log('User signed in. Redirect URI:', redirectUriFromUrl, 'Event:', event);
      console.log('Access token preview:', accessTokenPreview);
      console.log('Refresh token preview:', refreshTokenPreview);

      if (isAppFlow) {
        if (deepLinkTriggeredRef.current) {
          console.log('Deep link already triggered. Skipping because guard is set.');
          return;
        }

        if (!hasTokens) {
          console.warn('Deep link skipped: missing tokens.');
          return;
        }

        if (event !== 'SIGNED_IN') {
          console.log('Deep link skipped: waiting for SIGNED_IN. Current event:', event);
          return;
        }

        deepLinkTriggeredRef.current = true;
        
        // CRITICAL: Get the freshest session to ensure tokens are complete
        (async () => {
          console.log('=== FETCHING FRESH SESSION ===');
          const { data: { session: freshSession }, error } = await supabase.auth.getSession();
          
          if (error || !freshSession) {
            console.error('Failed to get fresh session:', error);
            toast({
              title: "Erreur d'authentification",
              description: "Impossible de récupérer la session. Veuillez réessayer.",
              variant: "destructive",
            });
            deepLinkTriggeredRef.current = false;
            return;
          }

          // DEBUG: Log complete session object to identify token sources
          console.log('=== FULL SESSION OBJECT ===');
          console.log('Full Session Object:', JSON.stringify(freshSession, null, 2));
          console.log('Session keys:', Object.keys(freshSession));
          console.log('===========================');

          // Validation of tokens existence only
          const accessToken = freshSession.access_token;
          const refreshToken = freshSession.refresh_token;
          
          console.log('=== READING TOKEN PROPERTIES ===');
          console.log('Reading freshSession.access_token:', typeof accessToken, accessToken?.substring(0, 30));
          console.log('Reading freshSession.refresh_token:', typeof refreshToken, refreshToken?.substring(0, 30));
          
          console.log('=== TOKEN VALIDATION ===');
          console.log('Access Token Length:', accessToken?.length);
          console.log('Refresh Token Length:', refreshToken?.length);
          console.log('Access Token Preview:', accessToken?.substring(0, 20) + '...');
          console.log('Refresh Token Preview:', refreshToken?.substring(0, 20) + '...');
          
          // Validate token existence (no length check)
          if (!accessToken) {
            console.error('MISSING ACCESS TOKEN');
            toast({
              title: "Erreur de token",
              description: "Access token manquant. Veuillez vous reconnecter.",
              variant: "destructive",
            });
            deepLinkTriggeredRef.current = false;
            return;
          }
          
          if (!refreshToken) {
            console.error('MISSING REFRESH TOKEN');
            console.error('Refresh token value:', refreshToken);
            toast({
              title: "Erreur de token",
              description: "Refresh token manquant. Veuillez vous reconnecter.",
              variant: "destructive",
            });
            deepLinkTriggeredRef.current = false;
            return;
          }
          
          console.log('✅ Tokens exist - passing to app');
          
          // Build callback URL with EXACT redirect_uri from app and FRESH tokens
          const target = `${redirectUriFromUrl}?access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`;
          
          console.log('=== DEEP LINK REDIRECT ===');
          console.log('Original redirect_uri:', redirectUriFromUrl);
          console.log('Final target URL (first 100 chars):', target.substring(0, 100) + '...');
          console.log('========================');
          
          // Clean up localStorage
          localStorage.removeItem('ormozy_redirect_uri');
          
          // Show success message before redirecting
          toast({
            title: "Authentification réussie !",
            description: "Retour vers l'application...",
            duration: 3000,
          });
          
          // Small delay to let the toast show
          setTimeout(() => {
            window.location.href = target;
          }, 500);
        })();
        
        return;
      }

      // Normal web flow - go to dashboard once
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        console.log('Navigating to dashboard');
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        console.log('Email login successful');
        
        // onAuthStateChange will handle the redirect
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
      } else {
        // For signup, preserve redirect_uri in the email confirmation link
        const currentRedirectUri = searchParams.get('redirect_uri');
        const redirectUrl = currentRedirectUri
          ? `${window.location.origin}/auth?redirect_uri=${encodeURIComponent(currentRedirectUri)}`
          : `${window.location.origin}/dashboard`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const currentRedirectUri = searchParams.get('redirect_uri');
      
      console.log('Starting Google OAuth. Redirect URI:', currentRedirectUri);
      
      // Preserve redirect_uri through OAuth callback
      const finalRedirectTo = currentRedirectUri && currentRedirectUri.startsWith('ormozy://')
        ? `${window.location.origin}/auth?redirect_uri=${encodeURIComponent(currentRedirectUri)}`
        : `${window.location.origin}/dashboard`;
      
      console.log('OAuth redirectTo:', finalRedirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: finalRedirectTo,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred with Google sign-in",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src={ormozyMascots} 
            alt="Ormozy mascots" 
            className="h-24 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl font-semibold mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Sign in to continue tracking your day" 
              : "Start tracking your work patterns today"}
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground hover:text-foreground underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
