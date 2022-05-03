import {
  NextFunction,
  Request as RequestDefault,
  Response,
  Router,
} from 'express';

interface Request extends RequestDefault {
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
};

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `);
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send('You must provide an email and password');
  }

  if (email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = { loggedIn: false };
  res.redirect('/');
});

router.get('/', (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You're logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You're not logged in</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export { router };
